// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

@SCREEN
D=A
@R0
M=D
@n
M=0
(START)
@KBD
D=M
@CLEAR_SCREEN // KBD is 0, so clear screen
D;JEQ
(COLOR)
// if n == 512 (all pixel blocks) goto START
@n
D=M
@R1
D=D-M
@START
D;JEQ
// start coloring
@R0
D=M
@n
A=D+M
M=-1
@n
M=M+1
@START
0;JEQ
(CLEAR_SCREEN)
@n
D=M
@START
D;JLT // if (n == 0) goto START -- all pixels cleared
@n
D=M
@R0
A=D+M
M=0
@n
M=M-1
@CLEAR_SCREEN
0;JMP
