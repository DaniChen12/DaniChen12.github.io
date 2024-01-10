using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HW00Ver2
{
    public partial class Form1 : Form
    {
        private List<string> _leftList;
        private List<string> _rightList;
        public Form1()
        {
            InitializeComponent();
            CreatList();
            SetListBoxSelectionMode();
            ChangeData();
        }
        private void CreatList()
        {
            _leftList = new List<string>
            {
                "農夫","狼","羊","菜",
            };
            _rightList = new List<string>();
        }
        private void SetListBoxSelectionMode()
        {
            listBox1.SelectionMode = SelectionMode.One;
            listBox2.SelectionMode = SelectionMode.One;
        }
        private void ChangeData()
        {
            listBox1.DataSource = null;
            listBox2.DataSource = null;
            listBox1.DataSource = _leftList;
            listBox2.DataSource = _rightList;
        }


        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        //private void Moveitem(string item, List<string> sourceList, List<string> destinationList)
        ////建立一個私有方法，string item 是方法的第一个参数，表示要移动的项，它的类型是字符串。
        ////List<string> sourceList 是方法的第二个参数，表示源列表，即要从中移除项的列表，它的类型是 List<string>，表示一个字符串类型的列表。
        ////List<string> destinationList 是方法的第三个参数，表示目标列表，即要将项添加到其中的列表，它的类型也是 List<string>，表示一个字符串类型的列表。
        ////目的是将源列表中的项移动到目标列表中。

        //{
        //    sourceList.Remove(item);
        //    destinationList.Add(item);
        //    if (item == "農夫")
        //    {

        //        _isFarmerOnLeft = !_isFarmerOnLeft;

        //    }
        //    else if (sourceList.Contains("農夫"))
        //    {
        //        destinationList.Remove("農夫");
        //        sourceList.Add("農夫");
        //    }


        //    if (sourceList.Contains("狼") && sourceList.Contains("羊"))
        //    {
        //        EndGame(1);
        //    }
        //    else if (sourceList.Contains("羊") && sourceList.Contains("菜"))
        //    {
        //        EndGame(2);
        //    }
        //    else if (sourceList.Contains("羊") && sourceList.Contains("菜") && sourceList.Contains("農夫") && sourceList.Contains("狼"))
        //    {
        //        EndGame(3);
        //    }
        //    ChangeData();
        //}
        private void LeftBoxMove ()
        {
            if (listBox1.SelectedItem != null)
            {
                string item = (string)listBox1.SelectedItem;
                if (item == "農夫")
                {
                    _leftList.Remove(item);
                    _rightList.Add(item);
                    if (_leftList.Contains("狼") && _leftList.Contains("羊"))
                    {
                        EndGame(1);
                    }
                    else if (_leftList.Contains("羊") && _leftList.Contains("菜"))
                    {
                        EndGame(2);
                    }
                }
                else
                {
                    if (_leftList.Contains("農夫"))
                    {
                        _leftList.Remove(item);
                        _rightList.Add(item);
                        _leftList.Remove("農夫");
                        _rightList.Add("農夫");

                        if (_leftList.Contains("狼") && _leftList.Contains("羊"))
                        {
                            EndGame(1);
                        }
                        else if (_leftList.Contains("羊") && _leftList.Contains("菜"))
                        {
                            EndGame(2);
                        }
                        else if (_rightList.Contains("羊") && _rightList.Contains("菜") && _rightList.Contains("農夫") && _rightList.Contains("狼"))
                        {
                            EndGame(3);
                        }
                    }
                }
            }

        }
        private void RightBoxMove ()
        {
            if (listBox2.SelectedItem != null)
            {
                string item = (string)listBox2.SelectedItem;
                if (item == "農夫")
                {
                    _rightList.Remove(item);
                    _leftList.Add(item);
                    if (_rightList.Contains("狼") && _rightList.Contains("羊"))
                    {
                        EndGame(1);
                    }
                    else if (_rightList.Contains("羊") && _rightList.Contains("菜"))
                    {
                        EndGame(2);
                    }

                }
                else
                {
                    if (_rightList.Contains("農夫"))
                    {
                        _rightList.Remove(item);
                        _leftList.Add(item);
                        _rightList.Remove("農夫");
                        _leftList.Add("農夫");

                        if (_rightList.Contains("狼") && _rightList.Contains("羊"))
                        {
                            EndGame(1);
                        }
                        else if (_rightList.Contains("羊") && _rightList.Contains("菜"))
                        {
                            EndGame(2);
                        }
                    }
                }
            }
        }
        private void button1_Click(object sender, EventArgs e)
        {
            LeftBoxMove();
            RightBoxMove();
            ChangeData();
        }


        private void button3_Click(object sender, EventArgs e)
        {
            CreatList();
            ChangeData();
            label1.Text = string.Empty;
            label1.Text = ($"農夫要帶著狼、羊、菜過河，小船不夠大，因此農夫每次只能帶一樣東西過河。\r\n當農夫在的時候，狼、羊、菜都不會有事情。當農夫不在的時候，狼會吃羊，羊會吃菜。");
            listBox1.Enabled = true;
            listBox2.Enabled = true;
            button1.Enabled = true;
        }
        private void EndGame(int result)
        {
            if (result == 1)
            {
                label1.Text = ($"狼把羊吃了__QAQ\n遊戲結束");
                listBox1.Enabled = false;
                listBox2.Enabled = false;
                button1.Enabled = false;
            }
            else if (result == 2)
            {
                label1.Text = ($"羊把菜吃了__菜QQ\n遊戲結束");
                listBox1.Enabled = false;
                listBox2.Enabled = false;
                button1.Enabled = false;
            }
            else if (result == 3)
            {
                label1.Text = ($"恭喜成功過河!!\n遊戲結束");
                listBox1.Enabled = false;
                listBox2.Enabled = false;
                button1.Enabled = false;
            }
        }

    }
}
