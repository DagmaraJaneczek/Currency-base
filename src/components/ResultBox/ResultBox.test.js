import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';


describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />)
    });

    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            {from: 'PLN', to: 'USD', amount: '10', output: 'PLN 12.00 =  $3.43'},
            {from: 'PLN', to: 'USD', amount: '20', output: 'PLN 20.00 =  $5.71'},
            {from: 'PLN', to: 'USD', amount: '2', output: 'PLN 2.00 =  $0.57'},
            {from: 'PLN', to: 'USD', amount: '100', output: 'PLN 100.00 =  $28.57'},
        ];

        for(const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.output);

            cleanup();
        }

    });

    it('should render proper info about conversion when USD -> PLN', () => {

        const testCases = [
            {from: 'USD', to: 'PLN', amount: '3.43', output: '$3.43 = PLN 12.00'},
            {from: 'USD', to: 'PLN', amount: '5.71', output: '$5.71 = PLN 20.00'},
            {from: 'USD', to: 'PLN', amount: '0.57', output: '$0.57 = PLN 2.00'},
            {from: 'USD', to: 'PLN', amount: '28.57', output: '$28.57 = PLN 100.00'},
            {from: 'USD', to: 'USD', amount: '28.57', output: '$28.57 = $28.57'}
        ];

        for(const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.output);

            cleanup();
        }
    });
});