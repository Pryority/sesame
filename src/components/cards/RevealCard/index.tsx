import { CardProps } from '../Card';

export type RevealOptions = 'overview' | 'seedPhrase' | 'privateKey';

interface RevealCardProps extends CardProps {
  revealViewOption: RevealOptions;
  setRevealViewOption: (options: RevealOptions) => void;
}

export const RevealCard: React.FunctionComponent<
  React.PropsWithChildren<RevealCardProps>
> = (props) => {
  const { setRevealViewOption, title, message, revealViewOption } = props;
  return (
    <div className={'bg-white p-2 rounded-sm'}>
      <h3>{title}</h3>
      <div style={{ height: 10 }} />
      <p style={{ lineHeight: 1.3 }}>{message}</p>
      <div style={{ height: 20 }} />
      <button
        className="font-bold"
        style={{ color: '#ff6699', fontWeight: 600, fontSize: 18, padding: 0 }}
        onClick={() => setRevealViewOption(revealViewOption)}
      >
        Reveal
      </button>
    </div>
  );
};
