// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// n increments R2 (final product) R0 times per inner loop
// each outer loop runs R1 times, such that R2 is incremented R0 * R1 times
@n
M=0
@m
M=1
(LOOP)
@n
D=M
@R0
D=D-M
@INNER_END
D;JEQ
@n
M=M+1
@R2
M=M+1
@LOOP
0;JMP
(INNER_END)
@m
D=M
@R1
D=D-M
@END
D;JEQ
@m
M=M+1
@n
M=0
@LOOP
0;JMP
(END)
@END
0;JMP