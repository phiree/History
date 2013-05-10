using ZZTJTract;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using History;
using System.Collections.Generic;

namespace TestProject1
{


    /// <summary>
    ///This is a test class for Class1Test and is intended
    ///to contain all Class1Test Unit Tests
    ///</summary>
    [TestClass()]
    public class Class1Test
    {


        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Additional test attributes
        // 
        //You can use the following additional attributes as you write your tests:
        //
        //Use ClassInitialize to run code before running the first test in the class
        //[ClassInitialize()]
        //public static void MyClassInitialize(TestContext testContext)
        //{
        //}
        //
        //Use ClassCleanup to run code after all tests in a class have run
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //Use TestInitialize to run code before running each test
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //Use TestCleanup to run code after each test has run
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //
        #endregion


        /// <summary>
        ///A test for Tract
        ///</summary>
        [TestMethod()]
        public void TractTest()
        {
            Class1 target = new Class1(); // TODO: Initialize to an appropriate value
            string timeIndexRegexp = @".*公元前(?'year'\d+)年.*";
            // TODO: Initialize to an appropriate value

            string content = "汉纪七 汉文帝前十一年（壬申，公元前169年）"
                + "\r\n[1]冬，十一月，上行幸代；春，正月，自代还。"

                 + "\r\n[1]冬季，十一月，文帝巡行代国；春季，正月，文帝自代国返回长安。"
                 + "\r\n前九年（庚午，公元前171年）"

                  + "\r\n[1]春，大旱。"

                  + "\r\n[1]春季，发生大旱灾。";
            // TODO: Initialize to an appropriate value
            List<HEvent> expected = new List<HEvent>();

            HEvent e = new HEvent();
            e.Year = 169;
            e.Month = 0;
            e.Date = 0;
            e.Content = "汉纪七 汉文帝前十一年（壬申，公元前169年）"
            + "\r\n[1]冬，十一月，上行幸代；春，正月，自代还。"

             + "\r\n[1]冬季，十一月，文帝巡行代国；春季，正月，文帝自代国返回长安。";
            expected.Add(e);
            HEvent e2 = new HEvent();
            e2.Year = 171;
            e2.Month = 0;
            e2.Date = 0;
            e2.Content = "前九年（庚午，公元前171年）"

              + "\r\n[1]春，大旱。"

              + "\r\n[1]春季，发生大旱灾。";
            expected.Add(e2);

            List<HEvent> actual;
            actual = target.Tract(timeIndexRegexp, content,"");

            bool isEqual = actual.Count == expected.Count
                &&actual[1].Year==expected[1].Year;
            Assert.IsTrue(isEqual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
