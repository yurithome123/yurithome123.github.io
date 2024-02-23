package javaapplication1;
import java.lang.*;
import java.awt.event.*;
import java.io.*;
import java.util.*;
import javax.swing.*;

public class Matrices {
  public static void main(String[] args) {
    char bgMaterial = ' ';
    double o = 21;
    double scale = 9;
    int rot = 30;
    int focalLength = 70;
    int rescale = 0;
    char axis = 'x';
    char display[][] = new char[(int)(o + scale) + rescale][(int)(o+scale) + rescale];
    boolean animation = true;
    clearDisplay(display, bgMaterial);

    while (animation) {
      clearDisplay(display, bgMaterial);
    //double vertex1[] = {X, Y, Z, 1};
    double fvertex1[] = {-scale, -scale, -scale, o};
    double fvertex2[] = {scale, -scale, -scale, o};
    double fvertex3[] = {-scale, scale, -scale, o};
    double fvertex4[] = {-scale, -scale, scale, o};
    double fvertex5[] = {scale, scale, -scale, o};
    double fvertex6[] = {scale, -scale, scale, o};
    double fvertex7[] = {-scale, scale, scale, o};
    double fvertex8[] = {scale, scale, scale, o};

      
    double rv1[] = sRotate(fvertex1, rot, axis);
    double rv2[] = sRotate(fvertex2, rot, axis);
    double rv3[] = sRotate(fvertex3, rot, axis);
    double rv4[] = sRotate(fvertex4, rot, axis);
    double rv5[] = sRotate(fvertex5, rot, axis);
    double rv6[] = sRotate(fvertex6, rot, axis);
    double rv7[] = sRotate(fvertex7, rot, axis);
    double rv8[] = sRotate(fvertex8, rot, axis);

    
    double vertex1[] = toOrigin(rv1);
    double vertex2[] = toOrigin(rv2);
    double vertex3[] = toOrigin(rv3);
    double vertex4[] = toOrigin(rv4);
    double vertex5[] = toOrigin(rv5);
    double vertex6[] = toOrigin(rv6);
    double vertex7[] = toOrigin(rv7);
    double vertex8[] = toOrigin(rv8);

    double disVertex1[] = calc2DVertex(vertex1, focalLength);
    double disVertex2[] = calc2DVertex(vertex2, focalLength);
    double disVertex3[] = calc2DVertex(vertex3, focalLength);
    double disVertex4[] = calc2DVertex(vertex4, focalLength);
    double disVertex5[] = calc2DVertex(vertex5, focalLength);
    double disVertex6[] = calc2DVertex(vertex6, focalLength);
    double disVertex7[] = calc2DVertex(vertex7, focalLength);
    double disVertex8[] = calc2DVertex(vertex8, focalLength);

    display = appendToDisplay(display, disVertex1);
    display = appendToDisplay(display, disVertex2);
    display = appendToDisplay(display, disVertex3);
    display = appendToDisplay(display, disVertex4);
    display = appendToDisplay(display, disVertex5);
    display = appendToDisplay(display, disVertex6);
    display = appendToDisplay(display, disVertex7);
    display = appendToDisplay(display, disVertex8);

    calculateLine(disVertex1, disVertex2, display); // 1-2
    calculateLine(disVertex1, disVertex3, display); // 1-3
    calculateLine(disVertex1, disVertex4, display); // 1-4
    calculateLine(disVertex8, disVertex5, display); // 8-5
    calculateLine(disVertex8, disVertex6, display); // 8-6
    calculateLine(disVertex8, disVertex7, display); // 8-7
    calculateLine(disVertex2, disVertex5, display); // 2-5
    calculateLine(disVertex5, disVertex3, display); // 5-3
    calculateLine(disVertex3, disVertex7, display); // 3-7
    calculateLine(disVertex7, disVertex4, display); // 7-4
    calculateLine(disVertex4, disVertex6, display); // 4-6
    calculateLine(disVertex6, disVertex2, display); // 6-2
    
    
    //clearScreen();
    //clearScreen();
    drawDisplay(display);
      wait(200);
      rot += 4;
    }
  }

  public static char[][] appendToDisplay(char display[][], double disVertex[]) {
    int x = (int) Math.round(disVertex[0]);
    int y = (int) Math.round(disVertex[1]);
    
      display[x][y] = 'O';
    
    return display;
  }

  public static void drawDisplay(char display[][]) {
    PrintWriter fastPrint =new PrintWriter(System.out);
    fastPrint.print("\033[H\033[2J\033[H\033[2J");
      for (int j = 0; j < display[0].length; j++) {
        fastPrint.print("\n");
        for (int i = 0; i< display.length; i++) {
            fastPrint.print(display[i][j] + " ");
      }
    }
    fastPrint.print("\n");
    fastPrint.flush();
  }

  public static double[] calc2DVertex(double vertex[], int fL) {
    double x = vertex[0];
    double y = vertex[1];
    double z = vertex[2];
    //double o = vertex[3];
    
      vertex[0] = ((fL*x) / (fL + z));
      vertex[1] = ((fL*y) / (fL + z));
    return vertex;
  }
  
  public static void clearDisplay(char display[][], char bm){
    for (int i = 0; i < display.length; i++) {
      for (int j = 0; j< display[0].length; j++) {
        display[i][j] = bm;
      }
    }
  }

  public static double[] toOrigin(double vertex[]) {
    double x = vertex[0];
    double y = vertex[1];
    double z = vertex[2];
    double o = vertex[3];
    
    vertex[0] = o + x;
    vertex[1] = o + y;
    vertex[2] = o + z;
    return vertex;
  }

  /*public static double[] translationMatrix(double vertex, double transX, double transY, double transZ, double rotX, double rotY, double rotZ) {
    rotX = Math.toRadians(rotX);
    rotY = Math.toRadians(rotY);
    rotZ = Math.toRadians(rotZ);

    double identityMatrix[][] = new double {{1, 0, 0, 0},
                                            {0, 1, 0, 0},
                                            {0, 0, 1, 0},
                                            {0, 0, 0, 1}};
    for (int i = 0; i<4; i++)  {
      matrix[0][i] = matrix[0][i] * vertex[0];
      matrix[1][i] = matrix[0][i] * vertex[0];
      matrix[0][i] = matrix[0][i] * vertex[0];
      matrix[0][i] = matrix[0][i] * vertex[0];
    }
   

    double m[][] = new double[4][4];
    
  }*/

  public static void sTranslate(double vertex[], double transX, double transY, double transZ) {
    vertex[0] = vertex[0] + transX;
    vertex[1] = vertex[1] + transY;
    vertex[2] = vertex[2] + transZ;
  }

  public static double[] sRotate(double vertex[], double angdeg, char axis) {
    //X = x cos 0 - Y sin 0
    //Y = x sin0 + Y cos 0
    double x = vertex[0];
    double y = vertex[1];
    double z = vertex[2];
    angdeg = Math.toRadians(angdeg);
  
    if (axis == 'x') {
      vertex[0] = (x * Math.cos(angdeg)) - (y * Math.sin(angdeg));
      vertex[1] = (x * Math.sin(angdeg)) + (y * Math.cos(angdeg));
    }
    if (axis == 'y') {
      vertex[0] = (x * Math.cos(angdeg)) - (z * Math.sin(angdeg));
      vertex[2] = (x * Math.sin(angdeg)) + (z * Math.cos(angdeg));
    }
    if (axis == 'p') { // MAKES A PLANE!!??
      vertex[0] = (y * Math.cos(angdeg)) - (z * Math.sin(angdeg));
      vertex[2] = (y * Math.sin(angdeg)) + (z * Math.cos(angdeg));
    }
    //COUSTOM
    x = vertex[0];
    y = vertex[1];
    z = vertex[2];
    if (axis == 'z') { 
      vertex[1] = (z * Math.cos(angdeg)) - (y * Math.sin(angdeg));
      vertex[2] = (z * Math.sin(angdeg)) + (y * Math.cos(angdeg));
    }
    if (axis == 'x') { 
      vertex[1] = (z * Math.cos(angdeg)) - (y * Math.sin(angdeg));
      vertex[2] = (z * Math.sin(angdeg)) + (y * Math.cos(angdeg));
    }
    return vertex;
  }

  public static void calculateLine(double disVertex1[], double disVertex2[], char screen[][]) {
    int x1 = (int) Math.round(disVertex1[0]);
    int y1 = (int) Math.round(disVertex1[1]);

    int x2 = (int) Math.round(disVertex2[0]);
    int y2 = (int) Math.round(disVertex2[1]);
        // delta of exact value and rounded value of the dependent variable
        int d = 0;

        int dx = Math.abs(x2 - x1);
        int dy = Math.abs(y2 - y1);

        int dx2 = 2 * dx; // slope scaling factors to
        int dy2 = 2 * dy; // avoid floating point

        int ix = x1 < x2 ? 1 : -1; // increment direction
        int iy = y1 < y2 ? 1 : -1;

        int x = x1;
        int y = y1;

        if (dx >= dy) {
            while (true) {
                screen[x][y] = 'O';
                if (x == x2)
                    break;
                x += ix;
                d += dy2;
                if (d > dx) {
                    y += iy;
                    d -= dx2;
                }
            }
        } else {
            while (true) {
                screen[x][y] = 'O';
                if (y == y2)
                    break;
                y += iy;
                d += dx2;
                if (d > dy) {
                    x += ix;
                    d -= dy2;
                }
            }
        }
    }

  public static void wait(int ms) {
    try {
        Thread.sleep(ms);
    }
    catch(InterruptedException ex)  {
        Thread.currentThread().interrupt();
    }
  }

  public static void clearScreen() {  
    PrintWriter fastDraw=new PrintWriter(System.out);
    fastDraw.print("\033[H\033[2J");  
    fastDraw.flush();
  }
}