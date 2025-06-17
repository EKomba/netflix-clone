import Banner from "@/components/Banner";
import Header from "@/components/Header";
import requests from "@/utils/requests";
import Head from "next/head";
import { Movie } from "../typings";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { modalAtom } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import React from "react";
import { useAtomValue } from "jotai";
import Plans from "@/components/Plans";
import payments from "@/lib/stripe";
import { getProducts, Product } from "@invertase/firestore-stripe-payments";
import useSubscription from "@/hooks/useSubscription";
import useList from "@/hooks/useList";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[]
}

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) {
  const { loading, user } = useAuth();
  const showModal = useAtomValue(modalAtom);
  const subscription = useSubscription(user)
  const list = useList(user?.uid)

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products}/>;

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section id="trending" className="md:space-y-24 scroll-mt-20">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
        </section>

        {list.length > 0 && (
          <section id="mylist" className="scroll-mt-20">
            <Row title="My List" movies={list} />
          </section>
        )}

        <section id="genres" className="md:space-y-24 scroll-mt-20">
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
}

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
     includePrices: true,
     activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
