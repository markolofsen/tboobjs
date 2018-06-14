// console.log( process.env )

export const ENV = process.env.NODE_ENV || 'development';
export const isProduction = ENV === 'production';

export const apiDomain = isProduction ? '' : '';
// export const apiDomain = isProduction ? 'https://tenerifebook.com' : 'http://127.0.0.1:8000';
export const apiEndpoint = `${apiDomain}/api`

export const confSite = {
    version: '1.1',
}
