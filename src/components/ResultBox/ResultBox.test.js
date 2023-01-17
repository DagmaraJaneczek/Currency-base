import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';


describe('Component ResultBox', () => {
    it('should render without crashing', () => {

        const testCases = [
            {from: 'PLN', to: 'USD', amount: '12'},
            {from: 'PLN', to: 'USD', amount: '20'},
            {from: 'PLN', to: 'USD', amount: '2'},
            {from: 'PLN', to: 'USD', amount: '100'},

            {from: 'PLN', to: 'PLN', amount: '30'},

            {from: 'USD', to: 'PLN', amount: '3.43'},
            {from: 'USD', to: 'PLN', amount: '5.72'},
            {from: 'USD', to: 'PLN', amount: '0.57'},
            {from: 'USD', to: 'PLN', amount: '28.57'}
        ];

        for(const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
        };
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from='PLN' to='USD' amount={100} />)
        const output = screen.getByTestId('output')
        expect(output).toHaveTextContent('PLN 100.00 = $28.57');
    });

    it('should render proper info about conversion when USD -> PLN', () => {
        render(<ResultBox from='USD' to='PLN' amount={5.72} />)
        const output = screen.getByTestId('output')
        expect(output).toHaveTextContent('$5.72 = PLN 20.02');
    });

    it('should render proper info when same curreny is selected', () => {
        render(<ResultBox from ='PLN' to='PLN' amount={30}/>)
        const output = screen.getByTestId('output')
        expect(output).toHaveTextContent('PLN 30.00 = PLN 30.00');
    });

    it('should render "Wrong value" when value is smaller than zero', () => {
        render(<ResultBox from ='PLN' to='USD' amount={-100} />)
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value');
    });

    cleanup();
});