package com.seven.opencv;

import org.opencv.core.CvType;
import org.opencv.core.Mat;

import java.net.URL;

import static org.opencv.highgui.HighGui.imshow;
import static org.opencv.highgui.HighGui.waitKey;
import static org.opencv.imgcodecs.Imgcodecs.imread;
import static org.opencv.imgcodecs.Imgcodecs.imwrite;
import static org.opencv.imgproc.Imgproc.COLOR_RGB2GRAY;
import static org.opencv.imgproc.Imgproc.cvtColor;

class DemoApplicationTests extends BaseOpenCv {
    public static void main(String[] args) throws Exception {
        testOpencv();
    }

    public static void testOpencv() throws Exception {
        // 解决awt报错问题
        System.setProperty("java.awt.headless", "false");
        System.out.println(System.getProperty("java.library.path"));

        // 读取图像
        Mat image = imread("E:\\aaa-project\\autojs\\Screen_22-08-13-08-43-58.png");
        if (image.empty()) {
            throw new Exception("image is empty");
        }
        imshow("Original Image", image);

        // 创建输出单通道图像
        Mat grayImage = new Mat(image.rows(), image.cols(), CvType.CV_8SC1);
        // 进行图像色彩空间转换
        cvtColor(image, grayImage, COLOR_RGB2GRAY);

        imshow("Processed Image", grayImage);
        imwrite("E:\\aaa-project\\autojs\\学习强国\\openCV-study\\src\\main\\resources\\images\\screen_2022-08-13-17-56-49.bak.png", grayImage);
        waitKey();
    }
}