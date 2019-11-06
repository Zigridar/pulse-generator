#define F_CPU 8000000UL
#define BAUD 9600
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>
#include "uart.c"
#include "generator.c"

//generator's variables
unsigned int lowTime = 97;
unsigned int pulseTime = 5;

int main(void)
{
	//enable interrupts
	sei();
	
	//initialize UART
	uartInit();
	
	//initialize generator
	generatorInit();
	
	//initialize PORTD
	DDRD |= (1<<7);
	PORTD &= ~(1<<7);	

	//loop
	while(1)
	{
		//generatoStart(unsigned int lowTime, unsigned int pulseTime)
		//lowTime = [7800, 38] == 1 - 200 Hz
		
		generatorStart(lowTime, pulseTime);
		//uartSendChar('a');
	}
}

ISR(USART_RXC_vect)
{
	char input = uartReceiveChar();
	//toggle generator
	OnOff = 1;
	char c = 65;
	if (OnOff)
	{
		uartSendChar(c);
	}
	else
	{
		uartSendStr("Off  ");
	}
	
	if (input == '1')
	{
		lowTime = 38;
	}
	else if (input == '2')
	{
		lowTime = 97;
	}
}
