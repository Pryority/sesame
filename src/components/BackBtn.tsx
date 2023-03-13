import { ChevronButton } from './misc/ChevronButton';

interface BackBtnProps {
  title: string;
  onBack: any;
}

export const BackBtn: React.FunctionComponent<
  React.PropsWithChildren<BackBtnProps>
> = (props) => {
  const { title, onBack } = props;

  return (
    <button
      className={`flex space-x-2 items-center w-full`}
      style={{ padding: 0 }}
      onClick={() => onBack()}
    >
      <div className={'flex space-x-1 items-center'}>
        <ChevronButton />
        <h3>{title}</h3>
      </div>
    </button>
  );
};
