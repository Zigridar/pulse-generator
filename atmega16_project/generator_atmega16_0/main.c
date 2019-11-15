#define F_CPU 8000000UL
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>
#include "uart.c"
#include "generator.c"
#include "ADC.c"

//convert hex code to int
int HexToInt(char c)
{
	int num;
	if       (c >= 48 && c <= 57 ) {   num = c - 48;        }
	else  if (c >= 97 && c <= 102) {   num = c - 97 + 10;   }
	else  if (c >= 65 && c <= 70 ) {   num = c - 65 + 10;   }
	return num;
}

int main(void)
{
	
	//initialize UART
	uartInit();
	
	//initialize generator
	generatorInit();
	
	//data buffer
	char receive_arr[9];
	//data variable
	char data;
	//address variable
	int title = 0;
	//data counter
	int count = 0;
	//generator state (on/off)
	int generatorState;
	//frequency
	int frequency;
	//receive control sum
	int receive_sum;
	//calculated control sum
	int local_sum;
	//loop
	while(1)
	{
		//waiting for data
		data = uartReceiveChar();
		//if address == 255 //replace q to 255
		if(data == 'q') {
			title = 1;
		}
		else if(title) {
			//saving data to array
			receive_arr[count] = data;
			count++;
			//if data count == 9 stop receiving data
			if (count == 9)
			{
				//reset count and title
				count = 0;
				title = 0;
				
				//generator state (1|0) == (on|off)
				generatorState = HexToInt(receive_arr[0]);
				uartSendChar(receive_arr[0]);
				//space
				uartSendChar(32);
				
				//getting frequency
				int freq_arr[3];
				for (int i = 2; i < 5; i++)
				{
					freq_arr[i - 2] = HexToInt(receive_arr[i]);
					uartSendChar(receive_arr[i]);
				}
				//space
				uartSendChar(32);
				
				//calculate frequency
				frequency = freq_arr[0] * 100 + freq_arr[1] * 10 + freq_arr[2];

				//getting control sum
				int sum_arr[3];
				for (int i = 6; i < 9; i++)
				{
					sum_arr[i - 6] = HexToInt(receive_arr[i]);
					uartSendChar(receive_arr[i]);
				}
				
				//calculate receive control sum
				receive_sum = sum_arr[0] * 100 + sum_arr[1] * 10 + sum_arr[2];
				
				uartSendChar(32);
				//if local control sum == receive control sum do somthing
				local_sum = frequency + generatorState;
				if (local_sum == receive_sum)
				{
					uartSendChar('1');
				}
				else
				{
					uartSendChar('0');
				}

				//new line
				uartSendChar(13);
			}
		}
	}
}