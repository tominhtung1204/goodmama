import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import withLayout from "../../components/hoc/withLayout";
import Head from "../../components/head";
import {
  getAllBlog,
  getInfoWeb,
  getCategoryBlog,
  getBlogBySlug,
  getAllMenu
} from "../../services/actions";

const Breadcrumb = dynamic(() => import("../../components/breadcrumb"));
const ListCategory = dynamic(() =>
  import("../../components/page/blogCategory")
);

const RecentPost = dynamic(() => import("../../components/page/recentPost"));

const BlogDetail = props => {
  const [newBlog, setNewBlog] = useState(null);
  const [category, setNewCategory] = useState(null);

  useEffect(() => {
    getAllBlog({ page: 1, limit: 10 }).then(data => {
      setNewBlog(data);
    });
    getCategoryBlog().then(data => {
      setNewCategory(data);
    });
  }, []);

  const createMarkup = content => {
    return { __html: content };
  };
  return (
    <>
      <Head title={props.blog.title} description={props.blog.description} />
      <Breadcrumb page={props.blog.title} />
      <div className="blog-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
              <div className="single-blog">
                <div className="content">
                  <h1>{props.blog.title}</h1>

                  <ul className="meta">
                    <li>
                      <a href="#">{props.blog.author.name}</a>
                    </li>
                    <li>
                      <a href="#">{props.blog.category.title}</a>
                    </li>
                    <li>
                      <a href="#">
                        {new Date(props.blog.createdAt).getDate() +
                          "-" +
                          (new Date(props.blog.createdAt).getMonth() + 1) +
                          "-" +
                          new Date(props.blog.createdAt).getFullYear()}
                      </a>
                    </li>
                  </ul>
                  <h3 className="mb-30">{props.blog.description}</h3>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={createMarkup(props.blog.content)}
                  ></div>

                  <div className="blog-footer row mt-45">
                    <div className="post-tags col-lg-6 col-12 mv-15">
                      <h4>Tags:</h4>
                      <ul className="tag">
                        <li>
                          <a href="#">New</a>
                        </li>
                        <li>
                          <a href="#">brand</a>
                        </li>
                        <li>
                          <a href="#">black</a>
                        </li>
                        <li>
                          <a href="#">white</a>
                        </li>
                        <li>
                          <a href="#">chire</a>
                        </li>
                        <li>
                          <a href="#">table</a>
                        </li>
                        <li>
                          <a href="#">Lorem</a>
                        </li>
                        <li>
                          <a href="#">ipsum</a>
                        </li>
                        <li>
                          <a href="#">dolor</a>
                        </li>
                        <li>
                          <a href="#">sit</a>
                        </li>
                        <li>
                          <a href="#">amet</a>
                        </li>
                      </ul>
                    </div>

                    <div className="post-share col-lg-6 col-12 mv-15">
                      <h4>Share:</h4>
                      <ul className="share">
                        <li>
                          <a href="#">
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-google-plus"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">
              <ListCategory category={category} />
              <RecentPost blog={newBlog} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

BlogDetail.getInitialProps = async ({ req, query }) => {
  const menu = await getAllMenu(req);
  const info = await getInfoWeb(req);
  const blog = await getBlogBySlug(query.slug, req);
  return {
    info,
    blog,
    menu
  };
};

export default withLayout(BlogDetail);
