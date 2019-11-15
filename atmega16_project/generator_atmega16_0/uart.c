#ifndef UART_C
#define UART_C
#define BAUD 9600

//function to initialize UART
void uartInit(void)
{
	//set baud 9600
 	UBRRL = F_CPU/16/BAUD - 1;
 	//set RX-mode, set TX-mode
	UCSRB |= (1<<RXEN) | (1<<TXEN);
 	//using UCSRC registor, set data size 8 bit
 	UCSRC |= (1<<URSEL) | (1<<UCSZ1) | (1<<UCSZ0);
}

//function to send single char
void uartSendChar(char data)
{
	//if data register is empty then UDRE is set to "1"
	while(!(UCSRA & (1<<UDRE)));
	//write to UDR
	UDR = data;
}

//function to receive char
unsigned char uartReceiveChar(void)
{
	//if char was received then UDR is set to char
	while(!(UCSRA & (1<<RXC)));
	//read from UDR
	return UDR;
}

#endif
