import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'node:querystring';

export const getQueryParametr = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  parametrString: string,
) => {
  const parametr: string | string[] | null =
    context.query[parametrString] || null;

  if (Array.isArray(parametr)) {
    return parametr[0];
  }
  return parametr;
};
