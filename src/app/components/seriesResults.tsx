import { pointStructure } from "../series/state/point_structure";

type ResultType = {
  memberId: string;
  firstName: string;
  lastName: string;
};

interface ISeriesResults {
  results: ResultType[];
}

const SeriesResults = ({ results }: ISeriesResults) => {
  const points: number[] = pointStructure;
  return (
    <table>
      <thead>
        <td width={100}>Position</td>
        <td width={300}>Rider</td>
        <td width={150}>Series Points</td>
      </thead>
      <tbody>
        {results.map(({ memberId, firstName, lastName }, index) => {
          return (
            <tr key={memberId}>
              <td>{index + 1}:</td>
              <td>
                <p>
                  {firstName} {lastName}
                </p>
              </td>
              <td>{points[index + 1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SeriesResults;
