import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react/jsx-runtime';

interface CrumbProps {
	links: {
		href: string;
		title: string;
	}[];
	page: string;
}

const Crumb = ({ links, page }: CrumbProps) => {
	return (
		<div className='mb-6'>
			<Breadcrumb>
				<BreadcrumbList>
					{links.map((link, index) => (
						<Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					))}
					<BreadcrumbItem>
						<BreadcrumbPage>{page}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

export default Crumb;
