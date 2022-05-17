import React from 'react';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';
import NewsletterRegistration from "../components/input/newsletter-registration";
import Head from 'next/head';


function HomePage({events}) {

  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of greate events that allow you to evolve.."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage