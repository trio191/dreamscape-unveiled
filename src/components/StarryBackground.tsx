
import { DreamCanvas } from './DreamCanvas';

export const StarryBackground = () => {
  return (
    <>
      <div className="fixed inset-0 bg-dream-gradient -z-20" />
      <DreamCanvas />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01),transparent_60%)] -z-10" />
    </>
  );
};
