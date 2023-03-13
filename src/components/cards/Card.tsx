export interface CardProps {
  title: string;
  message: string;
}

export const Card: React.FunctionComponent<
  React.PropsWithChildren<CardProps>
> = (props) => {
  const { title, message } = props;
  return (
    <div className={'bg-white p-2 rounded-sm'}>
      <h3>{title}</h3>
      <div style={{ height: 10 }} />
      <p style={{ lineHeight: 1.3 }}>{message}</p>
    </div>
  );
};
