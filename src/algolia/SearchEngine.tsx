// Search Engine component

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox, Configure, useInstantSearch } from "react-instantsearch";
import conf from "../config/conf";
import { Card, Container } from "../components";
import { useMemo, type ReactNode } from "react";


// This component renders a single search result
function Hit({ hit }: { hit: any }) {
    if (hit.status !== 'active') return null; // active post check

    // return single element in card
    return (
        <div className="transform transition-all duration-300 hover:scale-105">
            <Card
                title={hit.title}
                featuredImage={hit.featuredImage}
                $id={hit.objectID}
                slug={hit.slug}
                username={hit.username}
            />
        </div>
    );
}

// Inner component to handle the logic of switching between Default View and Algolia
function SearchResults({ defaultView }: { defaultView: ReactNode }) {
    const { uiState, results } = useInstantSearch();

    // Check if user is typing
    const isSearching = (uiState[conf.algoliaIndexName]?.query || "").length > 0;

    // Check if we have algolia results
    const hasResults = results?.hits.some(hit => hit.status === 'active'); // Check for active posts

    // if User is searching, show algolia results
    if (isSearching) {
        return (
            <div className="py-12">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <Hits hitComponent={Hit} classNames={{
                            list: "contents",
                            item: "list-none"
                        }} />
                    </div>
                    {/* Show message if no results found */}
                    {!hasResults && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="bg-gray-100 rounded-full p-6 mb-4">
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No stories found
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                We couldn't find any articles matching your search. Try checking for typos or using different keywords.
                            </p>
                        </div>
                    )}
                </Container>
            </div>
        );
    }

    // Default view (passed from parent)
    return <>{defaultView}</>;
}

interface SearchEngineProps {
    defaultView?: ReactNode;
}

function SearchEngine({ defaultView }: SearchEngineProps) {
    // Initialize search client inside component to ensure fresh cache on mount
    const searchClient = useMemo(() => {
        return algoliasearch(conf.algoliaApplicationId, conf.algoliaSearchApiKey);
    }, []);

    // Instant Search
    return (
        <div className="w-full min-h-screen">
            <InstantSearch searchClient={searchClient} indexName={conf.algoliaIndexName}>
                <Configure hitsPerPage={20} />

                <div className="bg-black text-white py-16">
                    <Container>
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-6xl font-bold mb-4">
                                Explore <span className="text-lime-400">Stories</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Discover amazing content from our community of writers
                            </p>

                            <div className="relative max-w-2xl mx-auto">
                                <SearchBox
                                    classNames={{
                                        input: "w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all shadow-lg text-lg",
                                        submit: "hidden",
                                        reset: "hidden",
                                    }}
                                    placeholder="Search for articles..."
                                />
                            </div>
                        </div>
                    </Container>
                </div>

                {/* Use smart component that switches views */}
                <SearchResults defaultView={defaultView} />

            </InstantSearch>
        </div>
    );
}

export default SearchEngine;
