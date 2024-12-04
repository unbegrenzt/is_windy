import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DescriptionItem from './index';

describe('DescriptionItem', () => {
  it('displays the correct tip for high precipitation probability', () => {
    const forecastData = { precipitationProbability: '60', cloudCover: '30', temperature: '20' };
    render(<DescriptionItem forecastData={forecastData} />);
    expect(screen.getByText('Lleva un paraguas, hay alta probabilidad de lluvia.')).toBeInTheDocument();
  });

  it('displays the correct tip for high cloud cover', () => {
    const forecastData = { precipitationProbability: '30', cloudCover: '60', temperature: '20' };
    render(<DescriptionItem forecastData={forecastData} />);
    expect(screen.getByText('El día estará nublado, podrías necesitar una chaqueta ligera.')).toBeInTheDocument();
  });

  it('displays the correct tip for high temperature', () => {
    const forecastData = { precipitationProbability: '30', cloudCover: '30', temperature: '35' };
    render(<DescriptionItem forecastData={forecastData} />);
    expect(screen.getByText('Hace calor, mantente hidratado y usa protector solar.')).toBeInTheDocument();
  });

  it('displays the correct tip for low temperature', () => {
    const forecastData = { precipitationProbability: '30', cloudCover: '30', temperature: '5' };
    render(<DescriptionItem forecastData={forecastData} />);
    expect(screen.getByText('Hace frío, asegúrate de abrigarte bien.')).toBeInTheDocument();
  });

  it('displays the correct tip for pleasant weather', () => {
    const forecastData = { precipitationProbability: '30', cloudCover: '30', temperature: '20' };
    render(<DescriptionItem forecastData={forecastData} />);
    expect(screen.getByText('El clima está agradable, disfruta tu día.')).toBeInTheDocument();
  });
});
