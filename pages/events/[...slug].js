import React, {Fragment, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from "../../components/ui/error-alert";
import {events} from '../../data/event';

function FilterEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  
  const filterData = router.query.slug;

  useEffect(() => {
    setLoadedEvents(events);

  }, []);

  if(!loadedEvents){
    return <p className='center'>Loading . .  .</p>
  }

  const filteredYear = filterData? filterData[0] : 2022;
  const filteredMonth = filterData ? filterData[1] : 1;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    );
  });

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 
    
   ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please Adjust Your Value!</p>
        </ErrorAlert>
        <br />
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if(!filteredEvents || filteredEvents.length === 0){
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events Found on the Chosen Filter</p>
        </ErrorAlert>
        <br />

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){

//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props : {hadError: true}
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
  
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   };
// }

export default FilterEventsPage