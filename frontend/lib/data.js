export async function getFeaturedPackages(){
  return [
    { id: 'rio-5d', slug:'rio-de-janeiro-5-dias', title:'Rio de Janeiro — 5 dias: Sol & Cultura', region:'Rio de Janeiro', days:'5 dias / 4 noites', priceFrom:2499, gallery:['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop'], dayByDay:[{day:1,title:'Chegada',details:'Check-in'}], occupancyPrices:{single:3499,double:2499,triplo:2199} }
  ]
}
export async function getPackageBySlug(slug){ const pkgs = await getFeaturedPackages(); return pkgs.find(p=>p.slug===slug) }
