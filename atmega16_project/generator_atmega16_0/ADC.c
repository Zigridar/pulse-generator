#ifndef ADC_C
#define ADC_C

#define ADC_VREF_TYPE 0x40

void ADC_Init()
{
	//external voltage reference | ADC1 
	ADMUX |= (1<<REFS0) | (1<<MUX0);
	//enabla ADC | prescalling 8
	ADCSRA |= (1<<ADEN) | (1<<ADPS1) | (1<<ADPS0);
}

unsigned int ADC_Read()
{
	  // Start the AD conversion
	  ADCSRA |= 0x40;
	  // Wait for the AD conversion to complete
	  while((ADCSRA & 0x10)==0);
	  ADCSRA |= 0x10;
	  return ADC;
}

#endif