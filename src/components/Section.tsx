export const PageHeader = ({ title, intro }: { title: string; intro: string }) => (
  <header className="wrap pb-6 pt-16 lg:pt-24"><h1 className="display max-w-4xl">{title}</h1><p className="mt-5 max-w-xl text-lg text-ink-muted">{intro}</p></header>)
