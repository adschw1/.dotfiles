/* Discrete Mathematics Lab
 *
 * Author:       Todd Simeone
 *
 * Class:        CSCI 115
 *
 * Topic:        Counting
 *
 */


import java.io.*;
// import csci130.*;
import java.util.Scanner;

class Factorial {
	int value;

	Factorial (int v) {
		value = v;
	}

	int getFactorial() {
		int product = 1;

		if (value == 0 | value == 1)
			product = 1;
		else
			for (int idx = value; idx > 1; idx--)
				product *= idx;
				System.out.println(product);

		return product;
	}
}

class Permutation {
	int objects, timesTaken;
    Scanner keyboard = new Scanner(System.in);

	Permutation (int o, int tt) {
		objects = o;
		timesTaken = tt;
	}

	int getNumberOfPermutations () {
		return ((new Factorial(objects).getFactorial()) / (new Factorial(objects - timesTaken).getFactorial()));
	}
}

class Lab6e {
	public static void main(String args[]) {
		int n = 0, r = 0, result = 0;
        Scanner keyboard = new Scanner(System.in);

		System.out.print("Enter the total number of objects (n > 0):  ");
		n = keyboard.nextInt();

		while (n <= 0) {
			System.out.print("Please enter a positive integer:  ");
			n = keyboard.nextInt();
		}

		System.out.print("Enter the number of objects being selected (0 <= r <= n):  ");
		r = keyboard.nextInt();

		while (r < 0 | r > n) {
			System.out.print("Please enter a positive integer r such that (0 <= r <= n):  ");
			r = keyboard.nextInt();
		}

        keyboard.close();
		System.out.println();
		System.out.print("The number of permutations of " + n + " objects taken " + r + " at a time ");
		System.out.println("is:  " + (new Permutation(n, r)).getNumberOfPermutations());
		System.out.println();
	}
}
