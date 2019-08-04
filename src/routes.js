import Record from './components/Record'
import Topics from './components/Topics'
import Times from './components/Times'
import Reports from './components/Reports'
import ReportDailyTotals from './components/ReportDailyTotals'
import ReportAveragePerTopic from './components/ReportAveragePerTopic'

const routes = [
    {
        path: "/", 
        component: Record
    },
    {path: "/record", component: Record},
    {path: "/topics", component: Topics},
    {path: "/times", component: Times},
    {path: "/reports", component: Reports},
    {path: "/reports/daily-totals", component: ReportDailyTotals},
    {path: "/reports/avg-topic", component: ReportAveragePerTopic}
];

export default routes;