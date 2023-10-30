import type { VercelRequest, VercelResponse } from '@vercel/node'


const ensureCors = (req: VercelRequest, res: VercelResponse): boolean => {
    res.setHeader('Access-Control-Allow-Credentials', "true")
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return true
    }
    return false
}

export default function handler(req: VercelRequest, res: VercelResponse) {

    if (ensureCors(req, res)) return;
        
    const { name = 'World' } = req.query
    return res.json({
        message: `Hello ${name}!`,
    })
}