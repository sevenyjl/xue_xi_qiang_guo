package com.seven.opencv;

import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * https://blog.csdn.net/marooon/article/details/81332487
 */
public class DemoOutline extends BaseOpenCv {
    public static void main(String[] args) {
        Mat imread = Imgcodecs.imread("D:\\project\\xue_xi_qiang_guo\\openCV-study\\src\\main\\resources\\images\\videos.png");
        // 灰度处理
        Mat gary = new Mat();
        Imgproc.cvtColor(imread, gary, Imgproc.COLOR_RGB2GRAY);
        // 图像边缘处理
        Mat edges = new Mat();
        Imgproc.Canny(gary, edges, 200, 500, 3, false);
//        HighGui.imshow("edges", edges);
        // 寻找轮廓
        List<MatOfPoint> contours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(edges, contours, hierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_SIMPLE);
        // 测试轮廓输出
        System.out.println("轮廓数量：" + contours.size());
        System.out.println("hierarchy类型：" + hierarchy);
//        for (int k = 0; k < hierarchy.cols(); k++) {
//            System.out.print("轮廓下标：" + k + " { ");
//            double[] ds = hierarchy.get(0, k);
//            for (int l = 0; l < ds.length; l++) {
//                switch (l) {
//                    case 0:
//                        System.out.print(" 后一个轮廓下标：" + ds[l]);
//                        break;
//                    case 1:
//                        System.out.print("  前一个轮廓下标：" + ds[l]);
//                        break;
//                    case 2:
//                        System.out.print("  父轮廓下标：" + ds[l]);
//                        break;
//                    case 3:
//                        System.out.print("  内嵌轮廓下标：" + ds[l]);
//                        break;
//
//                    default:
//                        break;
//                }
//            }
//            System.out.print(" }\n");
//        }
        // 绘制轮廓
//        for (int i = 15; i < 18; i++) {
//        Point[] points = contours.get(15).toArray();
//        System.out.println(Arrays.toString(points));
//        Imgproc.drawContours(imread, contours, 15, new Scalar(0, 255, 0), Imgproc.INTER_LINEAR, Imgproc.LINE_AA);
//        Imgproc.drawContours(imread, contours, 16, new Scalar(0, 255, 0), Imgproc.LINE_8, Imgproc.LINE_AA);
//        }
//        HighGui.imshow("imread", imread);
//        Rect rect = Imgproc.boundingRect(contours.get(15));
//        RotatedRect rotatedRect = Imgproc.minAreaRect(new MatOfPoint2f(contours.get(15).toArray()));
//        System.out.println(rotatedRect.center);

        HighGui.imshow("gary", gary);

        HighGui.waitKey(0);
    }
}
