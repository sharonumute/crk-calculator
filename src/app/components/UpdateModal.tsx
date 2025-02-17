import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Papa from 'papaparse';
import _ from 'lodash';
import updatesDataRaw from '@/assets/data/app_updates.csv?raw';
import { notice } from '@/assets/images/icons';

type Category = 'feature' | 'improvement' | 'bugfix';

type Update = {
    date: string;
    title: string;
    description: string;
    category: Category;
};

type GroupedUpdate = {
    date: string;
    items: Update[];
};

const UPDATES = Papa.parse<Update>(updatesDataRaw, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    delimitersToGuess: [',', '\t', '|', ';'],
});

const groupedUpdates = _.groupBy(UPDATES.data, 'date');
const sortedDates = Object.keys(groupedUpdates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

const PROCESSED_UPDATES: GroupedUpdate[] = sortedDates.map((date) => ({
    date,
    items: groupedUpdates[date],
}));

const getCategoryColor = (category: Category) => {
    const colors = {
        feature: 'bg-green-100 text-green-800',
        improvement: 'bg-blue-100 text-blue-800',
        bugfix: 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const UpdateModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-8 duration-75 hover:scale-110 active:scale-95 flex items-center cursor-pointer">
                    <img src={notice} className="w-8" alt="Updates" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="cookie-run-font">Latest Updates</DialogTitle>
                    <DialogDescription className="sr-only">
                        View all recent changes and improvements to the application
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="space-y-6">
                        {PROCESSED_UPDATES.map(({ date, items }) => (
                            <div key={date} className="space-y-3">
                                <h3 className="font-medium text-lg text-gray-900 cookie-run-font">
                                    {formatDate(date)}
                                </h3>
                                <div className="space-y-4">
                                    {items.map((update) => (
                                        <div
                                            key={`${update.date}-${update.title}`}
                                            className="border rounded-lg p-4 bg-white shadow-sm"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium cookie-run-font">{update.title}</h4>
                                                        <Badge
                                                            variant="secondary"
                                                            className={
                                                                getCategoryColor(update.category) + ' cookie-run-font'
                                                            }
                                                        >
                                                            {update.category}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-500 cookie-run-font">
                                                        {update.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
