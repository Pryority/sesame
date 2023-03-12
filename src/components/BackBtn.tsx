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
      <div className={'flex items-center'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="16"
          zoomAndPan="magnify"
          viewBox="0 0 375 374.999991"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
        >
          <path
            fill="#2c2a3f"
            d="M 283.609375 361.796875 C 293.753906 351.644531 293.753906 335.179688 283.609375 325.023438 L 146.125 187.382812 L 283.609375 49.746094 C 293.753906 39.589844 293.753906 23.125 283.609375 12.96875 C 273.46875 2.816406 257.019531 2.816406 246.875 12.96875 L 91.023438 168.996094 C 80.878906 179.152344 80.878906 195.617188 91.023438 205.773438 L 246.875 361.796875 C 257.019531 371.953125 273.46875 371.953125 283.609375 361.796875 Z M 283.609375 361.796875 "
            fillOpacity="1"
            fillRule="evenodd"
          />
        </svg>
        <div style={{ width: 5 }} />
        <h3>{title}</h3>
      </div>
    </button>
  );
};
