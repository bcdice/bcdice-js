import TSResult from '../../result';

type Result = Omit<TSResult, 'detailedRands'> & {
  detailed_rands: {
    $kind(): string;
    $sides(): number;
    $value(): number;
    $to_n(): TSResult['detailedRands'][0];
  }[];
}
export default Result;
