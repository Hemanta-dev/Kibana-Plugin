/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState ,useEffect} from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiTitle,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTable ,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell ,
  EuiIcon, 
  EuiSpacer
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import { async } from 'rxjs/internal/scheduler/async';
import { string } from 'joi';
import { stringify } from 'querystring';


interface HemantaAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const HemantaApp = ({ basename, notifications, http, navigation }: HemantaAppDeps) => {
  const [todos, setTodos] = useState([]);
  
  const handleList =async()=>{
      try {
        const res = await fetch('http://localhost:8000/list-todos', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        if (res.status === 200) {
          const data = await res.json();
          console.log(data,"ppppppppppppppppppppppppppppppppp");
          setTodos(data);
          
        } else {
          throw new Error('Failed to fetch todos');
        }
      } catch (error) {
        console.log(error);
      }
  }
  //reset field
  
  //add todos
  const [todosAdd, setTodosAdd] = useState<{ todosInput: string }>({
    todosInput: "",
  });
  const reset =()=>{
    setTodosAdd({
      todosInput:""
    })
  }
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
    const { name, value } = e.target;
    setTodosAdd({ ...todosAdd, [name]: value });
  };


  const handleAdd =async() =>{
      try {
        const { todosInput } = todosAdd;

        if (!todosInput ) {
          console.log("Please fill all fields");
          return;
        }
        const response = await fetch("http://localhost:8000/add-todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todosInput
  
          }),
        });
        // const data = await response.json();
     
  
        if (response.ok) {
          window.alert("Todos Added Successfully");
          console.log("Todos Added Successfully");
          handleList();
          reset();
  
        }
      }catch(error){
      console.log(error);
    }

  }
  //delete button work 
  const handleDelete=async(id:string)=>{
    console.log(id,"99999999999999999999")
      try {
        const res = await fetch(`http://localhost:8000/delete-todos/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        if (res.status === 200) {
          window.alert("Todos Deleted Successfully");
          handleList();
        }
    }catch(error){
      console.log(error);
    }
  }

  //get by id 
  const [editTodos ,setEditTodos] = useState(false);
  const handleEdit=async(id:string)=>{
      try {
        const res = await fetch(`http://localhost:8000/get-todos/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        if (res.status === 200) {
          const data = await res.json();
          const updateData: string = data.todo.todosInput;
          const updateId: string = data.todo._id;
          console.log(updateData,"66666666666666666");
          setEditTodos(true);
          setTodosAdd({
            id:updateId,
            todosInput:updateData,
          });
        }
    }catch(error){
      console.log(error);
    }
  }
//edit 
const handleEditTodos=async(id:string)=>{
  try {
    const { todosInput } = todosAdd;

    if (!todosInput ) {
      console.log("Please fill all fields");
      return;
    }
    const response = await fetch(`http://localhost:8000/edit-todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todosInput

      }),
    });
    // const data = await response.json();
 

    if (response.ok) {
      console.log("Todos Edited Successfully");
      window.alert("Todos Edited Successfully");
      setEditTodos(false);
      handleList();
      reset();

    }
  }catch(error){
  console.log(error);
}

}
  useEffect(()=>{
    handleList();
  },[])


  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody>
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>Todo List</h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentBody>
                  <EuiFlexGroup justifyContent='spaceBetween'>
                    <EuiFlexItem grow={false} className='inputField'>
                      <EuiFieldText type="text"  name="todosInput" value={todosAdd.todosInput} onChange={handleInputs} placeholder='please add your today list ...........'/>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      {editTodos ? (
                         <EuiButton size="s"  color="primary" fill onClick={() => { handleEditTodos(todosAdd.id) }}>Edit</EuiButton>
                        

                      ):(
                        <EuiButton size="s"  color="primary" fill onClick={handleAdd}>Add</EuiButton>
                      )}
                     
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  <EuiSpacer size="xl"/>
                  <EuiTable >
                      <EuiTableHeader>
                        <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Todo List</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Action</EuiTableHeaderCell>
                      </EuiTableHeader>
                    <EuiTableBody>
                    {todos.map((item:string, index:number) => (
                        <EuiTableRow key={index} >
                            <EuiTableRowCell>{index+1}</EuiTableRowCell>
                            <EuiTableRowCell>{item.todosInput}</EuiTableRowCell>
                            <EuiTableRowCell>
                                <EuiFlexGroup>
                                    <EuiFlexItem >
                                        <EuiButton color="primary" fill size="s" onClick={()=>{handleEdit(item._id)}} ><EuiIcon type="documentEdit" size="m" /></EuiButton>
                                    </EuiFlexItem>
                                    <EuiFlexItem >
                                        <EuiButton color="danger" fill size="s" onClick={()=>{handleDelete(item._id )}}><EuiIcon type="trash" size="m" /></EuiButton>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiTableRowCell>
                          </EuiTableRow>
                    ))}
                    </EuiTableBody>
                  </EuiTable>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
         
        </>
      </I18nProvider>
    </Router>
  );
};
