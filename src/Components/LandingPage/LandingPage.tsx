import React from 'react';
import Card from '../Card/Card'

function LandingPage() {
    return (
        <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-10 mt-20 sm:mt-8">
            <Card location="Zuiderslag 2, 3833 BP, Leusden" url="https://jobs.github.com/positions/37ef38d2-7705-4432-b67f-f4860094d699" title="Frontend Developer Frontend Developer Frontend Developer" type="Full Time" created_at={new Date('Wed Dec 09 05:18:35 UTC 2020')} company="Cactus Communications" company_logo="https://img.huffingtonpost.com/asset/5ce57b4c210000b90ed0e864.png?cache=LVoNCtl&ops=1200_630" />
            <Card location="Zuiderslag 2, 3833 BP, Leusden" url="https://jobs.github.com/positions/37ef38d2-7705-4432-b67f-f4860094d699" title="Frontend Developer Frontend Developer Frontend Developer" type="Full Time" created_at={new Date('Thu Dec 10 15:45:08 UTC 2020')} company="Cactus Communications" company_logo="https://img.huffingtonpost.com/asset/5ce57b4c210000b90ed0e864.png?cache=LVoNCtl&ops=1200_630" />
        </div>
    );
}

export default LandingPage;