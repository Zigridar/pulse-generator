#ifndef GENERATOR_C
#define GENERATOR_C
#include <util/delay.h>

//timer overflow counter
unsigned long counter = 0;
//lowTime 
unsigned int lowTime = 125; //lowTime = 10000 / frequency
//on or off generator
unsigned int OnOff = 0;

//function to initialize generator(initialize timer/counter 0)
void generatorInit(void)
{
	//enable interrupt
	TIMSK |= (1<<0);
	sei();
	
	//prescaling 8
	TCCR0 = 0b00000010;
	TCNT0 = 0;
	
	//initialize port //PC0
	DDRC |= (1<<0);
	PORTC &= ~(1<<0);
	//initialize port PD2 (indicator)
	DDRD |= (1<<2);
	PORTD &= ~(1<<2);

}

//one pulse
void pulse(unsigned int pulseTime)
{	
	pulseTime++;
	pulseTime /=2;
	PORTC |= (1<<0);
	while(pulseTime--)
	{
		_delay_us(1);
	}
	PORTC &= ~(1<<0);
}

//stop generator
void generatorStart()
{
	OnOff = 1;
	PORTD |=(1<<2);
}

//sta
void generatorStop(void)
{
	OnOff = 0;
	PORTD &= ~(1<<2);
}

//interrupt function
ISR(TIMER0_OVF_vect)
{
	counter++;
	if((counter >= lowTime) && OnOff) {//125 == 80 //500 == 20Hz //50 == 200Hz //204 == 50Hz //102 == 100Hz
		if (OnOff)
		{
			pulse(5);
			counter = 0;
		}
	}
	else {
		TCNT0 = 167;
	}
}

#endif
