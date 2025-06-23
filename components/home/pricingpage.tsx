import Link from "next/link";
import { Button } from "../ui/button";
import { Check } from "lucide-react"; // Import Check icon for features list

type Plan = {
    id: string;
    name: string;
    price: number;
    items: string[];
    description: string;
    paymentLink: string;
    priceId: string;
}

const plans: Plan[] = [
    {
        id: "basic",
        name: 'Basic',
        price: 1,
        items: ['5 Summaries per month', '1000 words per summary', 'Basic AI analysis', 'Basic PDF support'],
        description: 'For personal use & light summarization needs',
        paymentLink: 'https://www.google.com',
        priceId: 'price_1QZ999999999999999999999'
    },
    {
        id: "pro",
        name: "Pro",
        price: 10,
        items: ['Unlimited Summaries', 'Unlimited words per summary', 'Premium AI analysis', 'Priority support'],
        description: 'For professionals& heavy summarization tasks',
        paymentLink: 'https://www.google.com',
        priceId: 'price_1QZ999999999999999999999'
    }
];

const PricingCard = ({name, price, items, description, paymentLink} : typeof plans[number]) => {
    return (
        // Added transition, hover:scale, hover:shadow, and cursor-pointer for the hover effect
        <div className="relative w-full max-w-sm border border-gray-200 text-gray-900 shadow-lg rounded-xl overflow-hidden p-6 flex flex-col justify-between h-full
                        transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer
                        dark:border-gray-700 dark:text-gray-50">
            <div className="flex flex-col items-center text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">{name}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>

            <div className="flex flex-col items-center mb-6">
                <p className="text-5xl font-extrabold text-primary">${price}</p>
                <p className="text-muted-foreground text-sm">/ month</p>
            </div>

            <ul className="space-y-3 text-left w-full mb-8">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-foreground">
                        {/* Conditionally render the checkmark and text only if the item is not empty */}
                        {item.trim() !== '' ? (
                            <>
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </>
                        ) : (
                            // For placeholder items, render an empty div to maintain height, but no icon/text
                            <div className="h-4 w-4 flex-shrink-0" aria-hidden="true"></div>
                        )}
                    </li>
                ))}
            </ul>

            <Button className="w-full text-lg py-3">
                <Link href={paymentLink} className="w-full text-center">Buy Now</Link>
            </Button>
        </div>
    );
};

export default function PricingSection() {
    return (
        <section id="pricing" className="flex flex-col items-center justify-center mx-auto z-0 py-20 sm:py-32 lg:py-40">
            <div className="container flex flex-col items-center justify-center gap-4 text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Pricing</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Choose the plan that's right for you. Get started with powerful PDF summaries today!
                </p>
            </div>
            <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8 w-full max-w-6xl">
                {plans.map((plan) => (
                    <PricingCard key={plan.id} {...plan} />
                ))}
            </div>
        </section>
    );
}