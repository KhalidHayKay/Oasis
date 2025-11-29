'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

type FAQItemType = {
	index: number;
	question: string;
	answer: string;
};

const FAQ = ({ FAQItem }: { FAQItem: FAQItemType[] }) => {
	return (
		<section className='pt-8 sm:pt-12 md:pt-16'>
			<h2 className='mb-5 text-2xl sm:text-4xl max-w-[400px] sm:max-w-full font-semibold text-foreground'>
				We have got the answers to your questions
			</h2>

			<div className='space-y-4'>
				<Accordion
					type='single'
					collapsible
					className='w-full'
					defaultValue={'item-' + FAQItem[0].index}
				>
					{FAQItem.map((item) => (
						<AccordionItem
							key={item.index}
							value={'item-' + item.index}
							className='py-5 sm:py-10'
						>
							<AccordionTrigger>
								<div className='flex gap-x-10 text-lg sm:text-2xl font-semibold px-5'>
									<p>{item.index.toString().padStart(2, '0')}</p>
									<p>{item.question}</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className='ml-18 mt-5 max-w-[80%] flex flex-col gap-4 text-lg text-balance'>
								<p>{item.answer}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};

export default FAQ;
