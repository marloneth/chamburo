export default function Footer() {
  return (
    <footer className="h-20 flex flex-col items-center border-t-2 p-2">
      <span>© 2023 Chamburo. All Rights Reserved</span>
      <div className="my-2 flex text-center flex-col md:flex-row">
        <span>Country icons created by &nbsp;</span>
        <a
          href="https://www.flaticon.com/packs/gloss-circle-world-flags"
          title="country icons"
          className="text-vibrant-blue underline decoration-vibrant-blue"
        >
          Xinh Studio - Flaticon
        </a>
      </div>
      <span>Marlon Torres</span>
    </footer>
  )
}
