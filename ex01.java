package javaapplication1;

import java.util.Scanner;

public class ex01 {

    public static void a() {
        Scanner input = new Scanner(System.in);
        int x0, x;
        System.out.println("Digite sua idade ;) :");
        x = input.nextInt();
        System.out.println("Posso tentar adivinha-lo?, 1 - Sim | 2 - Não ");
        x0 = input.nextInt();
        switch (x0) {
            case 1 ->
                System.out.println("SUA IDADE É = " + x + " ???");
            case 2 ->
                System.out.println("MAS VOU ADIVINHAR DO MESMO JEITO, SUA IDADE É: " + x);
            default ->
                System.out.println("Opção errada, mas vou falar mesmo assim, sua idade é" + x);
        }
        if (x < 18 || x > 60) {
            if (x < 18) {
                System.out.println("Você é -18");
            } else if (x >= 200) {
                System.out.println("Parabens, voce atingiu 2 seculos ;) ");
            } else if (x >= 100) {
                System.out.println("Parabens, voce atingiu 1 seculo");
            } else if (x >= 60) {
                System.out.println("Vovô, é você ;) ");
            } else {
                System.out.println("Você ainda é +18 mas ainda não chegou a ser idoso");
            }
        }
    }

    public static void b() {
        Scanner input = new Scanner(System.in);
        int x;
        System.out.println("Digite um numero: ");
        x = input.nextInt();
        if (x > 0) {
            System.out.println("O numero é positivo");
        } else if (x < 0) {
            System.out.println("O numero é negativo");
        } else {
            System.out.println("O numero é 0");
        }
    }

    public static void c() {
        // programa que mostre os numeros de 1 a 100
        for (int i = 1; i <= 100; i++) {
            System.out.println(i);
        }
        //WHILE
        int i = 1;
        while (i <= 100) {
            System.out.println(i);
            i++;
        }
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println(
                "DIGITE 1 PARA TESTE IDADE, 2 PARA TESTE DE NUMERO POSITIVO OU NEGATIVO, 3 PARA NUMEROS 1 A 100, 4 para nome na tela 50x:");

        switch (input.nextInt()) {
            case 1:
                a();
                break;
            case 2:
                b();
                break;
            case 3:
                c();
                break;
            case 4:
                for (int i = 0; i < 50; i++) {
                    System.out.println("Yuri Thome Marini Silva");
                }
            default:
                break;
        }
        int x = 0;

        while (x < 10) {

        }

    }
}
