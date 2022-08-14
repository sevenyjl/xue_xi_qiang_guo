package com.seven.opencv;

import org.opencv.core.Core;

import java.net.URL;

public class BaseOpenCv {
    static {
        // 加载动态库
        URL url = ClassLoader.getSystemResource("lib/opencv/opencv_java460.dll");
        System.load(url.getPath());
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
}
