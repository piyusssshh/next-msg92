import getURL from '@/utils/getURL';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';

export default function PricingSegmento({ data }) {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <h1 className='text-3xl font-semibold capitalize '>Segmento Pricing</h1>
            <div className='flex flex-col w-full gap-8'>
                <div className='flex flex-col w-full gap-4 h-fit p-8 bg-white rounded'>
                    <h2 className=' text-3xl font-semibold text-green-600 capitalize'>Free</h2>
                    <div className='flex flex-col text-xl'>
                        <p>{data?.connectComp?.content || `You can store user information for free using Segmento.`}</p>
                    </div>
                    <a href={getURL('signup', 'segmento')} target='_blank'>
                        <button className='btn btn-primary w-fit btn-md'>{data?.get_started || 'Get Started'}</button>
                    </a>
                </div>
                <ConnectWithTeam data={data?.connectComp} product={'Segmento'} href={'segmento'} />
            </div>
        </div>
    );
}
