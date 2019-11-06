#ifndef UART_C
#define UART_C

//function to initialize UART
void uartInit(void)
{
	UBRRL = F_CPU/16/BAUD - 1;
	//enable interrupts, set RX-mode, set TX-mode
	UCSRB |= (1<<RXCIE) | (1<<RXEN) | (1<<TXEN);
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

//function to receive string
/*
char * uartReceiveStr(void)
{
	int i;
	char input[10];
	char c;

	for(i = 0; i < 9; i++)
	{
		c = uartReceiveChar();
		if(c == '\0') break;
		input[i] = c;
	}

	input[i + 1] = 0;

	return input;
}
*/

//function to send string
void uartSendStr(char str [])
{
	unsigned int count = 0;
	while(str[count])
	{
		uartSendChar(str[count++]);
	}
}


#endif
