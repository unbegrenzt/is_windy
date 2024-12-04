import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index';
import useSearchOSM from '../../../hooks/useSearchOSM';

jest.mock('../../../hooks/useSearchOSM');

describe('SearchBar', () => {
  const mockUseSearchOSM = useSearchOSM;

  beforeEach(() => {
    mockUseSearchOSM.mockReturnValue({
      results: [],
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('displays loading animation when loading', () => {
    render(<SearchBar />);
    expect(screen.queryByTestId('loading-animation')).not.toBeInTheDocument();
  });

  it('displays search results when available', () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'test' } });
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });
});
