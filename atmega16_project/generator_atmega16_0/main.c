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
	
	//initialize ADC
	ADC_Init();

	//data buffer
	unsigned char receive_arr[9];
	//data variable
	unsigned char data;
	//address variable
	unsigned int title = 0;
	//data counter
	unsigned int count = 0;
	//generator state (on/off)
	unsigned int generatorState;
	//frequency
	unsigned int frequency;
	//receive control sum
	unsigned int receive_sum;
	//calculated control sum
	unsigned int local_sum;
	//response data array
	unsigned char response_arr[12];
	//array for different frequency ranks
	unsigned int freq_arr[3];
	//array for different control sum ranks
	unsigned int sum_arr[3];
	//array of characters for vacuum variable
	unsigned char vacuum_buf[3];
	//vacuum value
	unsigned int vacuumValue;
	//array of characters for any byte
	unsigned char any_buf[3];
	//any byte value
	unsigned int anyByte = 456;
	//array of characters for respons control sum value
	unsigned char buf_response_sum[3];
	//response control cum value
	unsigned int resposeControlSum;
	
	//loop
	while(1)
	{
		//waiting for data
		data = uartReceiveChar();
		//if address == 100 //replace q to 100
		if(data == 100) {
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
				
				//getting frequency
				for (int i = 2; i < 5; i++)
				{
					freq_arr[i - 2] = HexToInt(receive_arr[i]);
				}
				
				//calculate frequency
				frequency = freq_arr[0] * 100 + freq_arr[1] * 10 + freq_arr[2];

				//getting receive control sum				
				for (int i = 6; i < 9; i++)
				{
					sum_arr[i - 6] = HexToInt(receive_arr[i]);
				}
				
				//calculate receive control sum
				receive_sum = sum_arr[0] * 100 + sum_arr[1] * 10 + sum_arr[2];

				//if local control sum == receive control sum do somthing
				local_sum = frequency + generatorState;
				if (local_sum == receive_sum)
				{
					//do something
					
					//set frequency
					lowTime = 10000/frequency;
					//start generator
					if(generatorState == 1)
					{
						generatorStart();
					}
					//stop generator
					else
					{
						generatorStop();
					}
					//build response
					
					//address
					response_arr[0] = 100;
					//read ADC / vacuum gauge
					vacuumValue = ADC_Read();
					itoa(vacuumValue, vacuum_buf, 10);
					for(int i = 0; i < 3; i++)
					{
						response_arr[i + 1] = vacuum_buf[i];
					}
					//comma
					response_arr[4] = ',';
					//any byte
					anyByte = 456;
					itoa(anyByte, any_buf, 10);
					for (int i = 0; i < 3; i++)
					{
						response_arr[i + 5]  =any_buf[i];
					}
					//comma
					response_arr[8] = ',';
					//calculate response control sum
					resposeControlSum = vacuumValue + anyByte;
					itoa(resposeControlSum, buf_response_sum, 10);
					for (int i = 0; i <3; i++)
					{
						response_arr[i + 9] = buf_response_sum[i];
					}
					//send response
					for (int i = 0; i < 12; i++)
					{
						uartSendChar(response_arr[i]);
					}
				}//local == receive
			}//count == 9
		}// if(title)
	}//while
}//main