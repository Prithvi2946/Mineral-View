import React from 'react';
import TopSection from './top-section';
import Activity from './activity';

export default function HomePage() {
    return (
        <div style={{
            // background: "linear-gradient(180deg, #36F3B8 0%, #36F3B8 30%, #F6F6F6 60%, #F6F6F6 100%)",
            background: "linear-gradient(180deg, #36F3B8 0%, #36F3B8 10%, #F6F6F6 35%, #F6F6F6 100%)",
          }} className='mt-14 w-full'>    
            <TopSection />
            <Activity />
        </div>  
    )
}