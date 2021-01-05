import TSResult from '../../result';

type Result = Omit<TSResult, 'detailed_rands'> & {
  detailed_rands: {
    $kind(): string;
    $sides(): number;
    $value(): number;
    $to_n(): TSResult['detailed_rands'][0];
  }[];
}
export default Result;
