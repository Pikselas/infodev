import React from "react";
interface PageLayoutProps 
{
  title?: string;
  children: React.ReactNode;
}
const PageLayout:React.FC<PageLayoutProps> = ({title,children}:PageLayoutProps) =>
{
    return (
    <div className="main-panel">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
               <div className="card-header">
                <div className="card-title">{title}</div>
                </div>
                <div className="card-body">
                    {
                        children
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer
        style={{ position: "fixed", bottom: "0px", right: "0px" }}
        className="footer"
      >
        <div className="container-fluid">
          <div className="copyright ml-auto">
            {" "}
            @ 2025, Design & Developed By <a href="#">Infonetics</a>{" "}
          </div>
        </div>
      </footer>
    </div>
    );
}

export default PageLayout;