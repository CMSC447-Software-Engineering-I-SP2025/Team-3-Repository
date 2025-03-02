import dynamic from "next/dynamic";
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

/**
 * An SSR-Safe plot, because Plotly JS doesnt account for SSR.
 * Sigh, welcome to react libs being used in nextjs ...
 * @returns \<Plot/\> 
 */
const SsrSafePlot = ({ ...props }) => <Plot {...props} />

export default SsrSafePlot