function AppFooterCopyright() {
  return (
    <div className="flex justify-center items-center text-center">
      <div className="text-sm text-ternary-dark dark:text-ternary-light">
        &copy; {new Date().getFullYear()} Make It Look, All Rights Reserved.
      </div>
    </div>
  );
}

export default AppFooterCopyright;
