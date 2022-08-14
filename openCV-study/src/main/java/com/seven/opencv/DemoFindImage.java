package com.seven.opencv;

import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Scalar;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;

public class DemoFindImage extends BaseOpenCv {
    public static void main(String[] args) {
        Mat imread = Imgcodecs.imread("D:\\project\\xue_xi_qiang_guo\\openCV-study\\src\\main\\resources\\images\\screen_2022-08-13-17-56-49.png");
        // 灰度
        Mat gray = new Mat();
        Imgproc.cvtColor(imread, gray, Imgproc.COLOR_RGB2GRAY);
//        HighGui.imshow("gray",gray);

        // 二值化
        Mat dst = new Mat();
        Imgproc.threshold(gray, dst, 90, 255, 0);
//        HighGui.imshow("dst",dst);

        // 边缘处理
        ArrayList<MatOfPoint> contours = new ArrayList<>();
        Imgproc.findContours(dst, contours, new Mat(), Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_SIMPLE);

        for (int i = 0; i < contours.size(); i++) {
            Imgproc.drawContours(imread, contours, i, new Scalar(0, 255, 0), Imgproc.LINE_8, Imgproc.LINE_AA);
        }
        HighGui.imshow("imread",imread);

        HighGui.waitKey();
    }
}
