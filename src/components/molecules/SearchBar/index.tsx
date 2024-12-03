import React from 'react';
import Input from '@/components/atoms/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useSearchOSM from '@/hooks/useSearchOSM';
import Lottie from 'react-lottie';
import loadingAnimation from '@/animations/loading.json';

const SearchBar: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const { loading } = useSearchOSM(query);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div
      className="flex items-center
        rounded-full border border-gray-300
        p-2.5 w-3/4 lg:max-w-96">
      {loading ? (
        <Lottie options={defaultOptions} height={24} width={24} className="mr-2" />
      ) : (
        <FontAwesomeIcon icon={faSearch} className="mr-2" />
      )}
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
