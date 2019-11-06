#ifndef GENERATOR_C
#define GENERATOR_C
#include <util/delay.h>

//on or off generator
int OnOff = 0;

//function to initialize timer
void generatorInit()
{
	//prescaling 1024
	TCCR1B = 0b00000101;
	TCNT1 = 0; 
}

//one pulse
void pulse(unsigned int pulseTime)
{	
	pulseTime++;
	pulseTime /=2;
	PORTD |= (1<<7);
	while(pulseTime--)
	{
		_delay_us(1);
	}
	PORTD &= ~(1<<7);
}

void generatorStart(unsigned int lowTime, unsigned int pulseTime)
{
	if(TCNT1 > lowTime && OnOff)
	{
		pulse(pulseTime);
		TCNT1 = 0;
	}
}

#endif
